$(document).ready(function() {
    let searchTimeout;
    const searchInput = $('.header-search-input');

    searchInput.on('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchQuery = $(this).val();
            fetchCourses({
                search: searchQuery,
                page: 1
            });
        }, 500);
    });
}); 