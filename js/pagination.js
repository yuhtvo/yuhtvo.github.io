document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".posts");
    const posts = container
        ? Array.from(container.querySelectorAll(".post-item"))
        : [];

    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const pageNumber = document.getElementById("page-number");
    const paginationWrapper = document.querySelector(".pagination-wrapper");

    if (!posts.length) {
        if (paginationWrapper) paginationWrapper.remove();
        return;
    }

    const perPage = parseInt(document.body.dataset.perPage) || 10;
    const totalPages = Math.ceil(posts.length / perPage);

    // Đã sửa: Khởi tạo trang từ URL nếu có, nếu không thì mặc định là 1
    const params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get("page")) || 1;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function showPage(page, isFirstLoad = false) {
        const start = (page - 1) * perPage;
        const end = start + perPage;

        posts.forEach((post, index) => {
            post.classList.toggle("hidden", !(index >= start && index < end));
        });

        if (pageNumber) {
            pageNumber.textContent = `Page ${page} / ${totalPages}`;
        }

        if (prevBtn) {
            prevBtn.disabled = page === 1;
            prevBtn.classList.toggle("disabled", page === 1);
        }

        if (nextBtn) {
            nextBtn.disabled = page === totalPages;
            nextBtn.classList.toggle("disabled", page === totalPages);
        }

        // Đã sửa: Đồng bộ trang lên thanh địa chỉ URL để lưu trạng thái
        const url = new URL(window.location);
        url.searchParams.set("page", page);
        if (isFirstLoad) {
            history.replaceState({ page }, "", url);
        } else {
            history.pushState({ page }, "", url);
        }
    }

    if (totalPages <= 1) {
        posts.forEach(post => post.classList.remove("hidden"));
        if (paginationWrapper) paginationWrapper.remove();
        return;
    }

    // Chạy lần đầu tiên với tham số nhận biết tải trang
    showPage(currentPage, true);

    // Đã sửa: Lắng nghe sự kiện bấm nút Back/Forward của trình duyệt để tự chuyển trang
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.page) {
            currentPage = event.state.page;
            showPage(currentPage, true);
        }
    });

    nextBtn?.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            scrollToTop();
        }
    });

    prevBtn?.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            scrollToTop();
        }
    });
});