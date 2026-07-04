import { ColorSchemeSelector } from '@/components/common/color-scheme-selector';
import { ThemeSelector } from '@/components/common/theme-selector';
import { Outlet } from 'react-router-dom';

export default function LandingPageLayout() {
  return (
    <main>
      <div className="flex justify-end gap-2 p-2">
        <ThemeSelector />
        <ColorSchemeSelector />
      </div>
      <Outlet />
    </main>
  );
}
