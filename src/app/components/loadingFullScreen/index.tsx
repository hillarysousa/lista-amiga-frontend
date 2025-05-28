interface LoadingProps {
  small?: boolean;
}

export const Loading = ({ small = false }: LoadingProps) => {
  return (
    <div
      className={`w-full ${
        small ? "h-10 mr-3" : "h-15"
      } rounded-xl bg-white/50 animate-pulse block`}
    ></div>
  );
};
