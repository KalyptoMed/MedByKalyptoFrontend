import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Products: [
    { label: "Antibiotics", href: "/products/all" },
    { label: "Anti-Malarial", href: "/products/all" },
    { label: "Vitamins", href: "/products/all" },
    { label: "All Products", href: "/products/all" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Track Order", href: "/dashboard/user" },
    { label: "Returns Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socials = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#003836] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/assets/images/logo_no bg 1.png"
                alt="Medicart"
                width={52}
                height={38}
                className="object-contain brightness-0 invert"
              />
              <span className="text-white font-extrabold text-xl">Medicart</span>
            </div>
            <p className="text-[#9BD0CC] leading-relaxed text-sm max-w-xs">
              Nigeria&apos;s most trusted medical marketplace. Access verified medications and healthcare services from the comfort of your home.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#D0FF71] flex items-center justify-center transition-all duration-200 text-[#9BD0CC] hover:text-[#004D4A]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-[#D0FF71] font-bold mb-4 text-sm uppercase tracking-widest">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[#9BD0CC] hover:text-white text-sm transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-[#9BD0CC]">
            <a href="mailto:hello@medicart.ng" className="flex items-center gap-2 hover:text-white transition">
              <Mail size={15} /> hello@medicart.ng
            </a>
            <a href="tel:+2348144440000" className="flex items-center gap-2 hover:text-white transition">
              <Phone size={15} /> +234 814 444 0000
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={15} /> Lagos, Nigeria
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[#9BD0CC] text-sm">
            © {new Date().getFullYear()} Medicart by Kalypto. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-[#9BD0CC]">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
