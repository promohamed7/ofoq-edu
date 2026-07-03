$(document).ready(function() {
    // Category filtering
    const categoryTabs = $('[data-tabs] li');
    categoryTabs.click(function() {
        categoryTabs.removeClass('bg-white shadow');
        $(this).addClass('bg-white shadow');
        
        const categoryId = $(this).data('category-id');
        
        // Clear the container before fetching new courses
        $('.courses-grid').empty();
        
        // Reset pagination and fetch courses with this category
        currentPage = 1;
        loadedCourseIds.clear();
        
        fetchCourses({
            category: categoryId,
            page: 1,
            _: new Date().getTime() // Add cache busting
        });
    });

    // Sorting functionality
    const dropdownButton = $('#dropdownDefaultButton');
    const sortingDropdown = $('#sorting-dropdown');
    const sortingOptions = $('#sorting-dropdown a');

    // Set initial active state
    const initialSort = sortingOptions.first();
    initialSort.addClass('active');

    // Toggle dropdown
    dropdownButton.click(function(e) {
        e.stopPropagation();
        sortingDropdown.toggleClass('hidden');
    });

    // Close dropdown when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.relative').length) {
            sortingDropdown.addClass('hidden');
        }
    });

    // Handle sorting option selection
    sortingOptions.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Update active state
        sortingOptions.removeClass('active');
        $(this).addClass('active');
        
        // Update button text and close dropdown
        const sortBy = $(this).data('sort');
        dropdownButton.text($(this).text());
        sortingDropdown.addClass('hidden');
        
        // Clear the container before fetching new courses
        $('.courses-grid').empty();
        
        // Reset pagination and fetch courses
        currentPage = 1;
        loadedCourseIds.clear();
        
        // Fetch courses with new sorting
        fetchCourses({
            sort: sortBy,
            page: 1,
            _: new Date().getTime() // Add cache busting
        });
    });
}); 