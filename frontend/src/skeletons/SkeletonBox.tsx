import Skeleton from "react-loading-skeleton";

interface SkeletonBoxProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  count?: number;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width = "100%",
  height = 20,
  radius = 8,
  count = 1,
}) => {
  return (
    <Skeleton
      width={width}
      height={height}
      borderRadius={radius}
      count={count}
    />
  );
};

export default SkeletonBox;
