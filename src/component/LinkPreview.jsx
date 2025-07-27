function LinkPreview({ link }) {
  return (
    <div className="mt-6 p-4 bg-[#F2F2F2] rounded-xl w-[328px] text-right">
      <h2 className="text-[#118AD3] font-[IRANYekan] text-[16px] mb-2">لینک ثبت شده:</h2>
      <p className="text-[14px] font-[IRANYekan] text-[#333] break-words">{link}</p>
    </div>
  );
}

export default LinkPreview;
