import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COLOR_SCHEMES } from '@/config/theme';
import { useTheme } from '@/hooks/theme';
import { capitalize } from '@/utils/string';
import type { ColorScheme } from '@/types/theme';

export function ColorSchemeSelector() {
  const { colorScheme, setColorScheme } = useTheme();
  return (
    <Select value={colorScheme} onValueChange={(value: ColorScheme) => setColorScheme(value)}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Theme</SelectLabel>

          {COLOR_SCHEMES.map((scheme) => (
            <SelectItem key={scheme} value={scheme}>
              {capitalize(scheme)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
