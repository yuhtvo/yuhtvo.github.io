document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. LOGIC PHÂN TRANG (PAGINATION)
    // ==========================================
    const posts = document.querySelectorAll(".post-item");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const pageNumber = document.getElementById("page-number");
    const paginationWrapper = document.querySelector(".pagination-wrapper");

    if (posts.length > 0 && prevBtn && nextBtn) {
        const perPage = 12;
        const params = new URLSearchParams(window.location.search);
        let currentPage = parseInt(params.get("page")) || 1;
        const totalPages = Math.ceil(posts.length / perPage);

        // Kiểm tra nếu tổng số trang nhỏ hơn hoặc bằng 1 thì ẩn luôn thanh phân trang
        if (totalPages <= 1 && paginationWrapper) {
            paginationWrapper.style.display = "none";
        }

        function showPage(page, isFirstLoad = false) {
            // Giới hạn trang hợp lệ
            if (page < 1) page = 1;
            if (page > totalPages) page = totalPages;
            currentPage = page;

            const start = (page - 1) * perPage;
            const end = start + perPage;

            posts.forEach((post, index) => {
                if (index >= start && index < end) {
                    post.classList.remove("hidden"); // Dùng class thay vì ép cứng style inline
                } else {
                    post.classList.add("hidden");
                }
            });

            if (pageNumber) {
                pageNumber.textContent = `Page ${page} / ${totalPages}`;
            }

            prevBtn.disabled = (page === 1);
            nextBtn.disabled = (page === totalPages);

            // Cập nhật URL
            const url = new URL(window.location);
            url.searchParams.set("page", page);

            // Nếu là lần đầu tải trang thì replaceState, nếu do user bấm nút thì pushState để có thể bấm nút Back
            if (isFirstLoad) {
                history.replaceState({ page }, "", url);
            } else {
                history.pushState({ page }, "", url);
            }

            // Cuộn mượt lên đầu trang (chỉ cuộn khi user chủ động bấm nút)
            if (!isFirstLoad) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Khởi chạy lần đầu tiên
        showPage(currentPage, true);

        // Lắng nghe sự kiện bấm nút điều hướng của Trình duyệt (Nút Back / Forward)
        window.addEventListener("popstate", (event) => {
            if (event.state && event.state.page) {
                showPage(event.state.page, true);
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });
    }

    // ==========================================
    // 2. HIỆU ỨNG CHO PROJECT CARDS
    // ==========================================
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        // Thay vì viết đống setTimeOut phức tạp, chỉ cần gán biến bổ trợ delay vào CSS inline
        card.style.setProperty('--card-delay', `${index * 0.2}s`);
        card.classList.add('fade-in-active');

        // Sự kiện click xử lý tập trung
        card.addEventListener('click', (e) => {
            const projectUrl = card.getAttribute('data-url'); // Thêm attribute này vào HTML nếu muốn chuyển hướng
            if (projectUrl) {
                window.location.href = projectUrl;
            } else {
                console.log('Project card clicked:', card);
            }
        });
    });
});