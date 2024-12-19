
import {Avatar} from "./Avatar"

type DashboardTitleProps = {
  title: string;
};

const DashboardTitle: React.FC<DashboardTitleProps> = ({ title }) => {
  return (
    <div className="w-full flex items-center justify-between pb-3">
      <h1 className="font-bold text-xl md:text-2xl">{title}</h1>
      <Avatar size={40} />
    </div>
  )
}

export default DashboardTitle