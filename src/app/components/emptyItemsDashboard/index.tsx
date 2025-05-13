export const EmptyItemDashboard = () => {
  return (
    <div
      aria-label={`Sem itens`}
      className="bg-[#f7f6f5] rounded-xl flex w-full p-4 mb-9 flex-col justify-between"
    >
      <h3 className="text-darkText text-base font-bold mb-5">
        Você não possui itens!
      </h3>
      <p className="text-darkText text-base">
        Crie um item para acessá-lo aqui.
      </p>
    </div>
  );
};
