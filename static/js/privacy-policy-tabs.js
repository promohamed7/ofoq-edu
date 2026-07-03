function showSection(sectionId) {
    // Hide both sections
    document.getElementById('human-friendly').classList.add('hidden');
    document.getElementById('legal-nonsense').classList.add('hidden');

    // Remove active styling from both tabs
    document.getElementById('human-friendly-tab').classList.remove('text-gray-600', 'bg-white', 'shadow-md');
    document.getElementById('human-friendly-tab').classList.add('text-gray-500');
    document.getElementById('legal-nonsense-tab').classList.remove('text-gray-600', 'bg-white', 'shadow-md');
    document.getElementById('legal-nonsense-tab').classList.add('text-gray-500');

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Add active styling to the selected tab
    if (sectionId === 'human-friendly') {
        document.getElementById('human-friendly-tab').classList.add('text-gray-600', 'bg-white', 'shadow-md');
        document.getElementById('human-friendly-tab').classList.remove('text-gray-500');
    } else {
        document.getElementById('legal-nonsense-tab').classList.add('text-gray-600', 'bg-white', 'shadow-md');
        document.getElementById('legal-nonsense-tab').classList.remove('text-gray-500');
    }
}

// Show the Human-friendly section by default
document.addEventListener('DOMContentLoaded', function() {
    showSection('human-friendly');
}); 