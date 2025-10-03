import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  index: number;
}

export const StatsCard = ({ icon: Icon, value, label, index }: StatsCardProps) => {
  return (
    <div 
      className="group relative bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 text-center space-y-3 sm:space-y-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300 mx-auto">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent" />
      </div>
      
      <div className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-accent transition-colors duration-300">
        {value}
      </div>
      <div className="text-sm sm:text-base text-slate-300 font-medium leading-tight">
        {label}
      </div>
    </div>
  );
};