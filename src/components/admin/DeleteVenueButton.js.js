import React from 'react';

const DeleteVenueButton = ({ venueId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this venue? This action cannot be undone.")) {
            try {
                const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                if (!response.ok) throw new Error(`Failed to delete venue, status code: ${response.status}`);
                alert('Venue deleted successfully.');
                onDeleteSuccess(); // Callback to refresh the venue list or update UI
            } catch (error) {
                alert(`Error deleting venue: ${error.message}`);
                console.error("Deletion error:", error);
            }
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete Venue
        </button>
    );
};

export default DeleteVenueButton;
