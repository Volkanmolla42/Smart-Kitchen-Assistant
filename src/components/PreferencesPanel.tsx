import React from "react";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface PreferencesPanelProps {
  onPreferencesChange?: (preferences: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    budget: number;
  }) => void;
  defaultPreferences?: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
    budget: number;
  };
}

const PreferencesPanel = ({
  onPreferencesChange = () => {},
  defaultPreferences = {
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    budget: 50,
  },
}: PreferencesPanelProps) => {
  const [preferences, setPreferences] = React.useState(defaultPreferences);

  const handlePreferenceChange = (key: string, value: boolean | number) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    onPreferencesChange(newPreferences);
  };

  return (
    <Card className="w-full max-w-[800px] bg-white">
      <CardContent className="p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Dietary Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="vegetarian" className="flex-1">
                Vegetarian
              </Label>
              <Switch
                id="vegetarian"
                checked={preferences.isVegetarian}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("isVegetarian", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="vegan" className="flex-1">
                Vegan
              </Label>
              <Switch
                id="vegan"
                checked={preferences.isVegan}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("isVegan", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="gluten-free" className="flex-1">
                Gluten-Free
              </Label>
              <Switch
                id="gluten-free"
                checked={preferences.isGlutenFree}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("isGlutenFree", checked)
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Budget Range</Label>
              <span className="text-sm text-gray-500">
                ${preferences.budget.toFixed(2)}
              </span>
            </div>
            <Slider
              value={[preferences.budget]}
              onValueChange={(value) =>
                handlePreferenceChange("budget", value[0])
              }
              max={200}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$0</span>
              <span>$200</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesPanel;
