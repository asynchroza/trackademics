export const RequiredCreditsHeader = ({
  required,
  requiredCredits,
  currentCredits,
}: {
  required: boolean;
  requiredCredits: number;
  currentCredits: number;
}) => {
  return (
    <div className="flex flex-col items-end">
      <p className="text-sm text-slate-600">
        {required ? "Required" : "Allowed"} total credits from this elective
        group: {requiredCredits}
      </p>
      <p className="text-end text-sm text-slate-600">
        Current credits: {currentCredits}
      </p>
    </div>
  );
};
