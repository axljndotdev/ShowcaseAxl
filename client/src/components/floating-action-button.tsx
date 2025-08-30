import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingActionButton() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Showcase - Affiliate Store",
        text: "Discover amazing products from trusted affiliate partners",
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      // You could add a toast notification here
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        size="icon"
        onClick={handleShare}
        className="w-14 h-14 gradient-accent rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        data-testid="button-floating-share"
      >
        <Share2 className="w-6 h-6 text-accent-foreground" />
      </Button>
    </div>
  );
}
