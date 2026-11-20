
const content = document.getElementById("content");
const pageTitle = document.getElementById("page-title");
const searchInput = document.getElementById("search");
const darkModeButton = document.getElementById("darkMode");

const tenSach = [
    ["Đắc Nhân Tâm", "Dale Carnegie", "Kỹ năng sống"],
    ["Nhà Giả Kim", "Paulo Coelho", "Tiểu thuyết"],
    ["Tuổi Trẻ Đáng Giá Bao Nhiêu", "Rosie Nguyễn", "Kỹ năng sống"],
    ["Dế Mèn Phiêu Lưu Ký", "Tô Hoài", "Văn học"],
    ["Tôi Thấy Hoa Vàng Trên Cỏ Xanh", "Nguyễn Nhật Ánh", "Văn học"],
    ["Mắt Biếc", "Nguyễn Nhật Ánh", "Văn học"],
    ["Harry Potter", "J.K. Rowling", "Tiểu thuyết"],
    ["Sherlock Holmes", "Arthur Conan Doyle", "Trinh thám"],
    ["Lược Sử Thời Gian", "Stephen Hawking", "Khoa học"],
    ["Vũ Trụ Trong Vỏ Hạt Dẻ", "Stephen Hawking", "Khoa học"],
    ["Clean Code", "Robert C. Martin", "Công nghệ"],
    ["Java Cơ Bản", "Nhiều tác giả", "Công nghệ"],
    ["Lập Trình C++", "Nhiều tác giả", "Công nghệ"],
    ["HTML và CSS", "Jon Duckett", "Công nghệ"],
    ["JavaScript Cơ Bản", "Nhiều tác giả", "Công nghệ"],
    ["Lịch Sử Thế Giới", "Nhiều tác giả", "Lịch sử"],
    ["Chiến Tranh Thế Giới Thứ Hai", "Antony Beevor", "Lịch sử"],
    ["Lịch Sử Việt Nam", "Nhiều tác giả", "Lịch sử"],
    ["Tư Duy Nhanh Và Chậm", "Daniel Kahneman", "Tâm lý học"],
    ["Đi Tìm Lẽ Sống", "Viktor Frankl", "Tâm lý học"]
];

function taoDanhSachSach() {
    const danhSach = [];

    tenSach.forEach((thongTin, index) => {
        const maSach = "S" + String(index + 1).padStart(3, "0");

        for (let i = 1; i <= 5; i++) {
            danhSach.push({
                id: maSach + "-" + String(i).padStart(2, "0"),
                bookId: maSach,
                title: thongTin[0],
                author: thongTin[1],
                category: thongTin[2],
                status: "available"
            });
        }
    });

    return danhSach;
}

function taoDuLieuBanDau() {
    return {
        books: taoDanhSachSach(),
        loans: [],
        returned: []
    };
}

function docDuLieu() {
    try {
        const duLieuDaLuu = localStorage.getItem("libraryManagementData");

        if (!duLieuDaLuu) {
            return taoDuLieuBanDau();
        }

        const duLieu = JSON.parse(duLieuDaLuu);

        if (
            !duLieu ||
            !Array.isArray(duLieu.books) ||
            !Array.isArray(duLieu.loans) ||
            !Array.isArray(duLieu.returned)
        ) {
            return taoDuLieuBanDau();
        }

        return duLieu;
    } catch {
        return taoDuLieuBanDau();
    }
}

let duLieu = docDuLieu();

function luuDuLieu() {
    localStorage.setItem(
        "libraryManagementData",
        JSON.stringify(duLieu)
    );
}

const tenTrang = {
    home: "Trang chủ",
    books: "Quản lý sách",
    categories: "Danh mục sách",
    borrow: "Đang mượn",
    return: "Đã trả sách",
    history: "Lịch sử giao dịch"
};

let trangHienTai = "home";

function anToan(chuoi) {
    return String(chuoi ?? "").replace(/[&<>"']/g, kyTu => {
        const bangMa = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return bangMa[kyTu];
    });
}

function ngayHienTai() {
    const ngay = new Date();
    const nam = ngay.getFullYear();
    const thang = String(ngay.getMonth() + 1).padStart(2, "0");
    const ngayTrongThang = String(ngay.getDate()).padStart(2, "0");

    return `${nam}-${thang}-${ngayTrongThang}`;
}

function ngaySauSoNgay(soNgay) {
    const ngay = new Date();
    ngay.setDate(ngay.getDate() + soNgay);

    const nam = ngay.getFullYear();
    const thang = String(ngay.getMonth() + 1).padStart(2, "0");
    const ngayTrongThang = String(ngay.getDate()).padStart(2, "0");

    return `${nam}-${thang}-${ngayTrongThang}`;
}

function dinhDangNgay(ngay) {
    if (!ngay) return "";

    const phanNgay = ngay.split("-");
    return `${phanNgay[2]}/${phanNgay[1]}/${phanNgay[0]}`;
}

function taoMaPhieu() {
    return "PM" + Date.now();
}

function timCuonSach(maCuon) {
    return duLieu.books.find(sach => sach.id === maCuon);
}

function timTenSach(maCuon) {
    const sach = timCuonSach(maCuon);
    return sach ? sach.title : "Không xác định";
}

function hienTrang(trang) {
    if (!tenTrang[trang]) return;

    trangHienTai = trang;
    pageTitle.textContent = tenTrang[trang];

    document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.page === trang
        );
    });

    searchInput.value = "";
    hienNoiDung();
}

function hienNoiDung() {
    if (trangHienTai === "home") hienTrangChu();
    if (trangHienTai === "books") hienQuanLySach();
    if (trangHienTai === "categories") hienDanhMuc();
    if (trangHienTai === "borrow") hienDanhSachMuon();
    if (trangHienTai === "return") hienDanhSachDaTra();
    if (trangHienTai === "history") hienLichSu();

    locBang();
}

function hienTrangChu() {
    const tongSach = duLieu.books.length;
    const dangMuon = duLieu.loans.length;

    const maSinhVien = new Set([
        ...duLieu.loans.map(phieu => phieu.mssv),
        ...duLieu.returned.map(phieu => phieu.mssv)
    ]);

    const quaHan = duLieu.loans.filter(phieu =>
        phieu.dueDate < ngayHienTai()
    ).length;

    content.innerHTML = `
        <div class="welcome">
            <h2>Chào mừng đến với thư viện</h2>
            <p>
                Hệ thống quản lý sách, thông tin mượn và trả sách
                trong thư viện.
            </p>
            <p>Tổng số lượng sách hiện có: 100 cuốn.</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <p>Tổng số sách</p>
                <h3>${tongSach}</h3>
            </div>

            <div class="stat-card">
                <p>Số độc giả</p>
                <h3>${maSinhVien.size}</h3>
            </div>

            <div class="stat-card">
                <p>Đang được mượn</p>
                <h3>${dangMuon}</h3>
            </div>

            <div class="stat-card">
                <p>Phiếu quá hạn</p>
                <h3>${quaHan}</h3>
            </div>
        </div>

        <div class="panel">
            <h2>Danh sách sách trong thư viện</h2>

            ${taoBangSach(duLieu.books.slice(0, 10))}
        </div>
    `;
}

function taoBangSach(danhSach) {
    if (danhSach.length === 0) {
        return `<div class="empty-state">Không có sách để hiển thị.</div>`;
    }

    return `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Mã cuốn sách</th>
                        <th>Tên sách</th>
                        <th>Tác giả</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>

                <tbody>
                    ${danhSach.map(sach => `
                        <tr>
                            <td>${anToan(sach.id)}</td>
                            <td>${anToan(sach.title)}</td>
                            <td>${anToan(sach.author)}</td>
                            <td>${anToan(sach.category)}</td>
                            <td>
                                <span class="${sach.status === "available" ? "status-available" : "status-borrowed"}">
                                    ${sach.status === "available" ? "Có sẵn" : "Đang mượn"}
                                </span>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function hienQuanLySach() {
    content.innerHTML = `
        <div class="panel">
            <div class="page-actions">
                <h2>Danh sách sách</h2>
                <strong>100 / 100 cuốn</strong>
            </div>

            ${taoBangSach(duLieu.books)}
        </div>
    `;
}

function hienDanhMuc() {
    const danhMuc = [...new Set(
        duLieu.books.map(sach => sach.category)
    )];

    content.innerHTML = `
        <div class="panel">
            <h2>Danh mục sách</h2>

            <div class="category-list">
                ${danhMuc.map(loai => {
                    const soLuong = duLieu.books.filter(
                        sach => sach.category === loai
                    ).length;

                    return `
                        <div class="category-card">
                            <h3>${anToan(loai)}</h3>
                            <p>${soLuong} cuốn sách</p>
                        </div>
                    `;
                }).join("")}
            </div>
        </div>
    `;
}

function hienDanhSachMuon() {
    content.innerHTML = `
        <div class="panel">
            <div class="page-actions">
                <h2>Danh sách đang mượn</h2>

                <button class="btn-primary" id="openBorrowModal">
                    Tạo phiếu mượn
                </button>
            </div>

            ${taoBangDangMuon()}
        </div>
    `;
}

function taoBangDangMuon() {
    if (duLieu.loans.length === 0) {
        return `
            <div class="empty-state">
                Hiện chưa có người mượn sách.
            </div>
        `;
    }

    return `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Mã phiếu</th>
                        <th>Họ và tên</th>
                        <th>MSSV</th>
                        <th>Lớp</th>
                        <th>Tên sách</th>
                        <th>Mã cuốn</th>
                        <th>Ngày mượn</th>
                        <th>Hạn trả</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    ${duLieu.loans.map(phieu => `
                        <tr>
                            <td>${anToan(phieu.id)}</td>
                            <td>${anToan(phieu.name)}</td>
                            <td>${anToan(phieu.mssv)}</td>
                            <td>${anToan(phieu.className)}</td>
                            <td>${anToan(timTenSach(phieu.copyId))}</td>
                            <td>${anToan(phieu.copyId)}</td>
                            <td>${dinhDangNgay(phieu.borrowDate)}</td>
                            <td>${dinhDangNgay(phieu.dueDate)}</td>
                            <td>
                                <button
                                    class="btn-return"
                                    data-action="return-book"
                                    data-id="${anToan(phieu.id)}">
                                    Xác nhận trả
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function hienDanhSachDaTra() {
    content.innerHTML = `
        <div class="panel">
            <h2>Danh sách sách đã trả</h2>
            ${taoBangDaTra()}
        </div>
    `;
}

function taoBangDaTra() {
    if (duLieu.returned.length === 0) {
        return `
            <div class="empty-state">
                Chưa có thông tin trả sách.
            </div>
        `;
    }

    return `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Mã phiếu</th>
                        <th>Họ và tên</th>
                        <th>MSSV</th>
                        <th>Lớp</th>
                        <th>Tên sách</th>
                        <th>Mã cuốn</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                    </tr>
                </thead>

                <tbody>
                    ${duLieu.returned.map(phieu => `
                        <tr>
                            <td>${anToan(phieu.id)}</td>
                            <td>${anToan(phieu.name)}</td>
                            <td>${anToan(phieu.mssv)}</td>
                            <td>${anToan(phieu.className)}</td>
                            <td>${anToan(timTenSach(phieu.copyId))}</td>
                            <td>${anToan(phieu.copyId)}</td>
                            <td>${dinhDangNgay(phieu.borrowDate)}</td>
                            <td>${dinhDangNgay(phieu.returnDate)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function hienLichSu() {
    const lichSu = [
        ...duLieu.loans.map(phieu => ({
            ...phieu,
            status: "Đang mượn",
            eventDate: phieu.borrowDate
        })),

        ...duLieu.returned.map(phieu => ({
            ...phieu,
            status: "Đã trả",
            eventDate: phieu.returnDate
        }))
    ];

    lichSu.sort((a, b) =>
        b.eventDate.localeCompare(a.eventDate)
    );

    content.innerHTML = `
        <div class="panel">
            <h2>Lịch sử giao dịch</h2>

            ${lichSu.length === 0
                ? `<div class="empty-state">Chưa có giao dịch nào.</div>`
                : `
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã phiếu</th>
                                    <th>Họ và tên</th>
                                    <th>MSSV</th>
                                    <th>Tên sách</th>
                                    <th>Mã cuốn</th>
                                    <th>Ngày giao dịch</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${lichSu.map(phieu => `
                                    <tr>
                                        <td>${anToan(phieu.id)}</td>
                                        <td>${anToan(phieu.name)}</td>
                                        <td>${anToan(phieu.mssv)}</td>
                                        <td>${anToan(timTenSach(phieu.copyId))}</td>
                                        <td>${anToan(phieu.copyId)}</td>
                                        <td>${dinhDangNgay(phieu.eventDate)}</td>
                                        <td>${phieu.status}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                `
            }
        </div>
    `;
}

function moFormMuonSach() {
    const sachCoSan = duLieu.books.filter(
        sach => sach.status === "available"
    );

    if (sachCoSan.length === 0) {
        alert("Hiện tại không còn cuốn sách nào có sẵn.");
        return;
    }

    const modalCu = document.getElementById("borrowModal");

    if (modalCu) modalCu.remove();

    const modal = document.createElement("div");
    modal.id = "borrowModal";
    modal.className = "modal show";

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Tạo phiếu mượn sách</h2>

            <form id="borrowForm">
                <div class="form-group">
                    <label for="borrowerName">Họ và tên</label>
                    <input
                        type="text"
                        id="borrowerName"
                        required
                        maxlength="100"
                        placeholder="Nhập họ và tên">
                </div>

                <div class="form-group">
                    <label for="borrowerMssv">MSSV</label>
                    <input
                        type="text"
                        id="borrowerMssv"
                        required
                        maxlength="30"
                        placeholder="Nhập mã số sinh viên">
                </div>

                <div class="form-group">
                    <label for="borrowerClass">Lớp</label>
                    <input
                        type="text"
                        id="borrowerClass"
                        required
                        maxlength="50"
                        placeholder="Nhập lớp">
                </div>

                <div class="form-group">
                    <label for="bookCopy">Chọn cuốn sách</label>
                    <select id="bookCopy" required>
                        <option value="">-- Chọn sách --</option>

                        ${sachCoSan.map(sach => `
                            <option value="${anToan(sach.id)}">
                                ${anToan(sach.title)} - ${anToan(sach.id)}
                            </option>
                        `).join("")}
                    </select>
                </div>

                <div class="form-group">
                    <label for="borrowDate">Ngày mượn</label>
                    <input
                        type="date"
                        id="borrowDate"
                        value="${ngayHienTai()}"
                        required>
                </div>

                <div class="form-group">
                    <label for="dueDate">Hạn trả</label>
                    <input
                        type="date"
                        id="dueDate"
                        value="${ngaySauSoNgay(14)}"
                        min="${ngayHienTai()}"
                        required>
                </div>

                <div class="modal-actions">
                    <button type="button" class="btn-cancel" id="closeBorrowModal">
                        Hủy
                    </button>

                    <button type="submit" class="btn-primary">
                        Tạo phiếu
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
}

function dongFormMuonSach() {
    const modal = document.getElementById("borrowModal");

    if (modal) modal.remove();
}

function taoPhieuMuon(event) {
    event.preventDefault();

    const name = document.getElementById("borrowerName").value.trim();
    const mssv = document.getElementById("borrowerMssv").value.trim();
    const className = document.getElementById("borrowerClass").value.trim();
    const copyId = document.getElementById("bookCopy").value;
    const borrowDate = document.getElementById("borrowDate").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!name || !mssv || !className || !copyId || !borrowDate || !dueDate) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    if (dueDate < borrowDate) {
        alert("Hạn trả không được trước ngày mượn.");
        return;
    }

    const sach = timCuonSach(copyId);

    if (!sach || sach.status !== "available") {
        alert("Cuốn sách này không còn khả dụng.");
        return;
    }

    const phieu = {
        id: taoMaPhieu(),
        name,
        mssv,
        className,
        copyId,
        borrowDate,
        dueDate
    };

    sach.status = "borrowed";
    duLieu.loans.push(phieu);

    luuDuLieu();
    dongFormMuonSach();
    hienNoiDung();

    alert("Tạo phiếu mượn thành công.");
}

function traSach(maPhieu) {
    const viTri = duLieu.loans.findIndex(
        phieu => phieu.id === maPhieu
    );

    if (viTri === -1) return;

    const xacNhan = confirm(
        "Xác nhận người mượn đã trả cuốn sách này?"
    );

    if (!xacNhan) return;

    const phieu = duLieu.loans[viTri];

    const sach = timCuonSach(phieu.copyId);

    if (sach) {
        sach.status = "available";
    }

    duLieu.returned.push({
        ...phieu,
        returnDate: ngayHienTai()
    });

    duLieu.loans.splice(viTri, 1);

    luuDuLieu();
    hienNoiDung();
}

function locBang() {
    const tuKhoa = searchInput.value.trim().toLowerCase();

    const cacDong = content.querySelectorAll("tbody tr");

    cacDong.forEach(dong => {
        const noiDungDong = dong.textContent.toLowerCase();

        dong.style.display = noiDungDong.includes(tuKhoa)
            ? ""
            : "none";
    });
}

document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", event => {
        event.preventDefault();
        hienTrang(item.dataset.page);
    });
});

content.addEventListener("click", event => {
    if (event.target.closest("#openBorrowModal")) {
        moFormMuonSach();
    }

    const nutTra = event.target.closest('[data-action="return-book"]');

    if (nutTra) {
        traSach(nutTra.dataset.id);
    }
});

document.addEventListener("click", event => {
    if (event.target.id === "closeBorrowModal") {
        dongFormMuonSach();
    }

    if (event.target.id === "borrowModal") {
        dongFormMuonSach();
    }
});

document.addEventListener("submit", event => {
    if (event.target.id === "borrowForm") {
        taoPhieuMuon(event);
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        dongFormMuonSach();
    }
});

searchInput.addEventListener("input", locBang);

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const dangToi = document.body.classList.contains("dark");

    darkModeButton.textContent = dangToi
        ? "Giao diện sáng"
        : "Giao diện tối";

    localStorage.setItem("libraryDarkMode", dangToi ? "dark" : "light");
});

if (localStorage.getItem("libraryDarkMode") === "dark") {
    document.body.classList.add("dark");
    darkModeButton.textContent = "Giao diện sáng";
}

hienTrang("home");
