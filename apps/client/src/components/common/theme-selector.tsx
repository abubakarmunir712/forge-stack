import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { THEMES } from '@/config/theme';
import { useTheme } from '@/hooks/theme';
import type { Theme } from '@/types/theme';
import { capitalize } from '@/utils/string';

export function ThemeSelector() {
  const { theme: currentTheme, setTheme: setCurrentTheme } = useTheme();
  return (
    <Select value={currentTheme} onValueChange={(value: Theme) => setCurrentTheme(value)}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Theme</SelectLabel>

          {THEMES.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {capitalize(theme)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
