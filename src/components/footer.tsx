import { translations } from '@/lib/translations';

export const Footer = () => {
  const t = translations;
  return (
    <footer className="border-t">
      <div className="container flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">
          {t.footer.copyright(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
};
