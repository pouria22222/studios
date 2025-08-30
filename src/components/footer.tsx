export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nazy's Nook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
