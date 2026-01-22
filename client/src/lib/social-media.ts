/**
 * Social Media Links Configuration
 * 
 * Add or modify your social media links here.
 * The footer will automatically read and display these links.
 */

import { Facebook, Instagram, Linkedin, LucideIcon } from "lucide-react";

export interface SocialMediaLink {
  name: string;
  icon: LucideIcon;
  url: string;
}

// Add your social media links here
export const socialMediaLinks: SocialMediaLink[] = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=61586711587600", // Replace with your Facebook page URL
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/areeb.technology/", // Replace with your Instagram profile URL
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/company/areebtech/",
  },
];
