export default function Footer() {
  return (
    <div className="bg-neutral-100 py-5">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="text-[#848484] text-sm">
              @ 2022 Shopee. Tất cả các quyền đều được bảo lưu
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[#848484] text-sm">
              Quốc gia & Khu vực: Singapore | Indonesia | Đài Loan | Thái Lan |
              Malaysia Việt Nam | Philippines | Brazil | México | Colombia |
              Chile
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ul className="flex space-x-14">
            <li className="text-[#848484] text-sm">CHÍNH SÁCH BẢO MẬT</li>
            <li className="text-[#848484] text-sm ">QUY CHẾ HOẠT ĐỘNG</li>
            <li className="text-[#848484] text-sm">CHÍNH SÁCH VẬN CHUYỂN</li>
            <li className="text-[#848484] text-sm">CHÍNH SÁCH TRẢ HÀNG</li>
          </ul>
        </div>

        <div>
          <p className="mb-14 text-center text-[#848484] text-sm">
            Công ty TNHH Shopee
          </p>
          <ul className="flex flex-col items-center justify-center space-y-4">
            <span className="text-[#848484] text-xs text-center">
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
              Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng
              đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn Chịu Trách
              Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024
              73081221 (ext 4678) Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch
              & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
            </span>
            <span className="text-[#848484] text-xs">
              © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
            </span>
          </ul>
        </div>
      </div>
    </div>
  );
}
