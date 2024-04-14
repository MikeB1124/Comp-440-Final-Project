<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Manager</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>
    <body>
        <!-- Start of Nav Bar -->
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="../index.php">Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="menu.php">Menu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="manager.php">Manager</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        <!-- End of Nav Bar -->

        <div class="container text-center">
            <div class="row mt-4 location-container">
                <select class="form-select select-location" multiple aria-label="Multiple select example">
                    <option selected id="0">Select Restaurant Location..</option>
                </select>
                <button type="button" class="btn btn-success add-location-button" data-bs-toggle="modal" data-bs-target="#addLocationModal">Add Location</button>
            </div>
        </div>

        <div class="container text-center menu-container">
        </div>





        <!-- Add Location Modal -->
        <div class="modal fade" id="addLocationModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Add Location</h1>
                </div>
                <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input class="form-control add-location-name-input">
                    <label class="form-label">Address</label>
                    <input class="form-control add-location-address-input">
                    <label class="form-label">City</label>
                    <input class="form-control add-location-city-input">
                    <label class="form-label">Postal Code</label>
                    <input class="form-control add-location-postal-code-input">
                    <label class="form-label">State</label>
                    <input class="form-control add-location-state-input">
                    <label class="form-label">Phone</label>
                    <input class="form-control add-location-phone-input">
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary add-location-modal-button" data-bs-dismiss="modal">Add</button>
                </div>
                </div>
            </div>
        </div>



        <!-- Update Location Modal -->
        <div class="modal fade" id="updateLocationModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Update Location</h1>
                </div>
                <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input class="form-control update-location-name-input">
                    <label class="form-label">Address</label>
                    <input class="form-control update-location-address-input">
                    <label class="form-label">City</label>
                    <input class="form-control update-location-city-input">
                    <label class="form-label">Postal Code</label>
                    <input class="form-control update-location-postal-code-input">
                    <label class="form-label">State</label>
                    <input class="form-control update-location-state-input">
                    <label class="form-label">Phone</label>
                    <input class="form-control update-location-phone-input">
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary update-location-modal-button" data-bs-dismiss="modal">Update</button>
                </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
        <script src="../js/manager.js"></script>
        <script>loadLocations()</script>
    </body>
</html>