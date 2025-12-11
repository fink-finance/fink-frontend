import { ProfileItem } from './ProfileItem';

interface ProfileDetailsProps {
  leftItems: Array<{ icon: React.ReactNode; label: string; value: string }>;
  rightItems: Array<{ icon: React.ReactNode; label: string; value: string }>;
}

export function ProfileDetails({ leftItems, rightItems }: ProfileDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        {leftItems.map((item) => (
          <ProfileItem key={item.label} {...item} />
        ))}
      </div>
      <div className="space-y-4">
        {rightItems.map((item) => (
          <ProfileItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
