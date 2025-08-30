export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold" data-testid="text-footer-logo">Showcase</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Discover amazing products from trusted affiliate partners
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <a 
              href="#" 
              className="hover:text-foreground transition-colors" 
              data-testid="link-privacy"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-foreground transition-colors" 
              data-testid="link-terms"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="hover:text-foreground transition-colors" 
              data-testid="link-disclosure"
            >
              Affiliate Disclosure
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © 2024 Showcase. All rights reserved. Affiliate commissions help support this platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
