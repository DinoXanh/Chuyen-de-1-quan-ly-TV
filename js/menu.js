
const menuItems = document.querySelectorAll(".menu-item");
const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");
const darkMode = document.getElementById("darkMode");

const duLieu = {
    home: {
        title: "Trang chủ",
        html: content.innerHTML
    },

    books: {
        title: "Quản lý sách",
        html: `
            <div class="section-header">
                <h3>Danh sách sách</h3>
                <input type="text" id="search" placeholder="Tìm kiếm sách...">
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Mã sách</th>
                            <th>Tên sách</th>
                            <th>Tác giả</th>
                            <th>Danh mục</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>S001</td><td>Đắc Nhân Tâm</td><td>Dale Carnegie</td><td>Kỹ năng sống</td><td>15</td></tr>
                        <tr><td>S002</td><td>Nhà Giả Kim</td><td>Paulo Coelho</td><td>Tiểu thuyết</td><td>12</td></tr>
                        <tr><td>S003</td><td>Tuổi Trẻ Đáng Giá Bao Nhiêu</td><td>Rosie Nguyễn</td><td>Kỹ năng sống</td><td>10</td></tr>
                        <tr><td>S004</td><td>Dế Mèn Phiêu Lưu Ký</td><td>Tô Hoài</td><td>Văn học</td><td>20</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },

    categories: {
        title: "Danh mục sách",
        html: `
            <div class="section-header"><h3>Danh sách danh mục</h3></div>
            <div class="table-container">
                <table>
                    <thead><tr><th>Mã danh mục</th><th>Tên danh mục</th><th>Mô tả</th></tr></thead>
                    <tbody>
                        <tr><td>DM01</td><td>Văn học</td><td>Sách văn học trong và ngoài nước</td></tr>
                        <tr><td>DM02</td><td>Kỹ năng sống</td><td>Sách phát triển bản thân</td></tr>
                        <tr><td>DM03</td><td>Tiểu thuyết</td><td>Các tác phẩm tiểu thuyết</td></tr>
                        <tr><td>DM04</td><td>Khoa học</td><td>Sách khoa học và công nghệ</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },

    readers: {
        title: "Quản lý độc giả",
        html: `
            <div class="section-header"><h3>Danh sách độc giả</h3></div>
            <div class="table-container">
                <table>
                    <thead><tr><th>Mã độc giả</th><th>Họ tên</th><th>Email</th><th>Số điện thoại</th></tr></thead>
                    <tbody>
                        <tr><td>DG001</td><td>Nguyễn Văn An</td><td>an@gmail.com</td><td>0901234567</td></tr>
                        <tr><td>DG002</td><td>Trần Thị Bình</td><td>binh@gmail.com</td><td>0912345678</td></tr>
                        <tr><td>DG003</td><td>Lê Minh Tuấn</td><td>tuan@gmail.com</td><td>0923456789</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },

    borrow: {
        title: "Mượn sách",
        html: `
            <div class="section-header"><h3>Danh sách mượn sách</h3></div>
            <div class="table-container">
                <table>
                    <thead><tr><th>Mã phiếu</th><th>Độc giả</th><th>Tên sách</th><th>Ngày mượn</th><th>Hạn trả</th></tr></thead>
                    <tbody>
                        <tr><td>PM001</td><td>Nguyễn Văn An</td><td>Đắc Nhân Tâm</td><td>10/11/2026</td><td>24/11/2026</td></tr>
                        <tr><td>PM002</td><td>Trần Thị Bình</td><td>Nhà Giả Kim</td><td>12/11/2026</td><td>26/11/2026</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },

    return: {
        title: "Trả sách",
        html: `
            <div class="section-header"><h3>Danh sách trả sách</h3></div>
            <div class="table-container">
                <table>
                    <thead><tr><th>Mã phiếu</th><th>Độc giả</th><th>Tên sách</th><th>Ngày trả</th><th>Trạng thái</th></tr></thead>
                    <tbody>
                        <tr><td>PT001</td><td>Lê Minh Tuấn</td><td>Dế Mèn Phiêu Lưu Ký</td><td>15/11/2026</td><td>Đã trả</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },

    history: {
        title: "Lịch sử giao dịch",
        html: `
            <div class="section-header"><h3>Lịch sử mượn và trả sách</h3></div>
            <div class="table-container">
                <table>
                    <thead><tr><th>Mã giao dịch</th><th>Độc giả</th><th>Tên sách</th><th>Hoạt động</th><th>Ngày thực hiện</th></tr></thead>
                    <tbody>
                        <tr><td>GD001</td><td>Nguyễn Văn An</td><td>Đắc Nhân Tâm</td><td>Mượn sách</td><td>10/11/2026</td></tr>
                        <tr><td>GD002</td><td>Lê Minh Tuấn</td><td>Dế Mèn Phiêu Lưu Ký</td><td>Trả sách</td><td>15/11/2026</td></tr>
                    </tbody>
                </table>
            </div>
        `
    }
};

menuItems.forEach(item => {
    item.addEventListener("click", function(event) {
        event.preventDefault();

        const page = this.dataset.page;

        menuItems.forEach(menu => menu.classList.remove("active"));
        this.classList.add("active");

        pageTitle.textContent = duLieu[page].title;
        content.innerHTML = duLieu[page].html;

        khoiTaoTimKiem();
    });
});

function khoiTaoTimKiem() {
    const search = document.getElementById("search");

    if (!search) return;

    search.addEventListener("input", function() {
        const keyword = this.value.toLowerCase();
        const rows = content.querySelectorAll("tbody tr");

        rows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(keyword)
                ? ""
                : "none";
        });
    });
}

darkMode.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    this.textContent = document.body.classList.contains("dark")
        ? "Chế độ sáng"
        : "Chế độ tối";
});

khoiTaoTimKiem();
