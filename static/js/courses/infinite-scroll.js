let currentPage = 1;
let isLoading = false;
let hasMoreData = true;
let loadedCourseIds = new Set(); // Track loaded course IDs

$(document).ready(function() {
    const loadMoreBtn = $('#load-more-btn');

    // Load more button click handler
    loadMoreBtn.click(function() {
        if (!isLoading && hasMoreData) {
            currentPage++;
            fetchCourses({
                page: currentPage,
                append: true
            });
        }
    });

    // Infinite scroll handler
    $(window).scroll(function() {
        if (!isLoading && hasMoreData && 
            ($(window).scrollTop() + $(window).height() > $(document).height() - 100)) {
            currentPage++;
            fetchCourses({
                page: currentPage,
                append: true
            });
        }
    });
});

// Global function to fetch courses with filters
function fetchCourses(params = {}) {
    const coursesContainer = $('.courses-grid');
    const loadMoreBtn = $('#load-more-btn');
    const loadingSpinner = $('#loading-spinner');

    // Reset pagination if not appending
    if (!params.append) {
        currentPage = 1;
        loadedCourseIds.clear(); // Clear tracked IDs when starting fresh
        coursesContainer.empty();  // Clear existing content when not appending
        hasMoreData = true; // Reset hasMoreData when starting fresh
    }

    if (isLoading) return;  // Prevent multiple simultaneous requests
    isLoading = true;

    loadingSpinner.removeClass('hidden');
    loadMoreBtn.addClass('hidden');

    // Get current active filters
    const activeCategory = $('[data-tabs] li.bg-white.shadow').data('category-id') || '';
    const searchQuery = params.search !== undefined ? params.search : $('.header-search-input').val() || '';
    const sortBy = params.sort || $('#sorting-dropdown a.active').data('sort') || 'recent';
    
    // Get current language from HTML lang attribute
    const currentLanguage = $('html').attr('lang') || 'ar';

    // Prepare the request data
    const requestData = {
        page: params.page || 1,
        search: searchQuery,
        category: params.category || activeCategory,
        sort: sortBy,
        lang: currentLanguage,
        _: new Date().getTime() // Cache busting parameter
    };


    $.ajax({
        url: '/courses/fetch/',
        type: 'GET',
        data: requestData,
        cache: false, // Disable AJAX caching
        success: function(response) {
            
            if (response.courses_html && response.courses_html.trim() !== '') {
                // Create a temporary div to parse the HTML and check for duplicates
                const tempDiv = $('<div>').html(response.courses_html);
                const newCourses = tempDiv.find('.course-card');

                if (newCourses.length > 0) {
                    // Filter out duplicates
                    const uniqueCourses = newCourses.filter(function() {
                        const courseId = $(this).data('course-id');
                        if (loadedCourseIds.has(courseId)) {
                            return false;
                        }
                        loadedCourseIds.add(courseId);
                        return true;
                    });

                    if (params.append) {
                        coursesContainer.append(uniqueCourses);
                    } else {
                        coursesContainer.html(uniqueCourses);
                    }

                    hasMoreData = response.has_next && uniqueCourses.length > 0;
                    
                    // Show/hide load more button based on whether there's more data
                    if (hasMoreData) {
                        loadMoreBtn.removeClass('hidden');
                    } else {
                        loadMoreBtn.addClass('hidden');
                    }
                } else {
                    if (!params.append) {
                        coursesContainer.html('<div class="col-span-3 text-center py-8 text-gray-500">No courses found.</div>');
                    }
                    loadMoreBtn.addClass('hidden');
                }
            } else {
                if (!params.append) {
                    // Handle empty response
                    coursesContainer.html('<div class="col-span-3 text-center py-8 text-gray-500">No courses found.</div>');
                }
                loadMoreBtn.addClass('hidden');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching courses:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load courses. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        },
        complete: function() {
            loadingSpinner.addClass('hidden');
            isLoading = false;
        }
    });
} 