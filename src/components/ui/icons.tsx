import { icons } from 'lucide-react';

export default function Icon({ name, color, size, className = '' }: { name: keyof typeof icons; color?: string; size?: number; className?: string }) {
    const LucideIcon = icons[name];

    return <LucideIcon className={className} color={color} size={size} />;
}
