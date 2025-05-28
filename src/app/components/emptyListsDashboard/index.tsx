export const EmptyListDashboard = () => {
  return (
    <div
      aria-label={`sem listas`}
      className="bg-[#f7f6f5] rounded-xl flex w-full p-4 mb-12 flex-col"
    >
      <h3 className="text-darkText text-base font-bold mb-5">
        Você não possui listas!
      </h3>
      <p className="text-darkText text-base">
        Crie uma lista para acessá-la aqui.
      </p>
    </div>
  );
};
