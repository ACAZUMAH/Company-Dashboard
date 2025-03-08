import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import MainHeader from "./mainHeader";

const Mainlayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={MainHeader}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Dashboard"  />}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Mainlayout;
