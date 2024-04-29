import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type MenuItemCardProps = {
  menuItem: MenuItem;
};

const MenuItemCard = ({ menuItem }: MenuItemCardProps) => {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">
          {menuItem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        {(menuItem.price / 100).toFixed(2)} $
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
