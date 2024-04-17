use RestaurantDB;

INSERT INTO Location (Location_Name, Address, City, Postal_Code, State, Phone) 
VALUES 
('Downtown Diner', '123 Main St', 'Metropolis', 12345, 'MP', '5551234567'),
('Cozy Cafe', '456 Elm St', 'Smalltown', 54321, 'ST', '5559876543'),
('Ocean View Restaurant', '789 Beach Blvd', 'Seaside', 67890, 'SD', '5555555555');


INSERT INTO Section (Location_ID, Section_Name, Description) 
VALUES 
(1, 'Breakfast', 'Start your day right with our delicious breakfast options.'),
(1, 'Lunch', 'Enjoy a hearty lunch with our savory dishes.'),
(1, 'Dinner', 'Indulge in our gourmet dinner selections.'),
(2, 'Appetizers', 'Kickstart your meal with our tasty appetizers.'),
(2, 'Entrees', 'Satisfy your hunger with our delicious entrees.'),
(2, 'Desserts', 'End your meal on a sweet note with our delightful desserts.'),
(3, 'Seafood Specialties', 'Savor the flavors of the ocean with our seafood specialties.'),
(3, 'Grilled Delights', 'Experience the taste of perfection with our grilled delights.'),
(3, 'Vegetarian Options', 'Discover our flavorful vegetarian dishes.');


INSERT INTO Item (Section_ID, Item_Name, Description, Image_Url, Price) 
VALUES 
(1, 'Classic Pancakes', 'Fluffy pancakes served with maple syrup.', 'https://iwashyoudry.com/wp-content/uploads/2019/05/Classic-Pancake-Recipe-11.jpg', 8.99),
(1, 'Eggs Benedict', 'Poached eggs with Canadian bacon on an English muffin, topped with hollandaise sauce.', 'https://natashaskitchen.com/wp-content/uploads/2022/04/Egg-Benedict-SQ.jpg', 10.99),
(1, 'French Toast', 'Thick slices of bread dipped in cinnamon egg batter, grilled to perfection.', 'https://www.dessertfortwo.com/wp-content/uploads/2018/08/brioche-french-toast-9-540x720.jpg', 9.99),

(2, 'Club Sandwich', 'Triple-decker sandwich with turkey, bacon, lettuce, tomato, and mayo.', 'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2022/06/club-sandwich.jpg', 12.99),
(2, 'Caesar Salad', 'Crisp romaine lettuce, croutons, and parmesan cheese tossed in Caesar dressing.', 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI.jpg', 9.99),
(2, 'Classic Burger', 'A juicy beef patty with lettuce, tomato, onion, and your choice of cheese.', 'https://media.cheddars.com/en_us/images/marketing/Burger_ClassicBurger_wCheeseEdit_Updated_(1)8.jpg', 11.99),

(3, 'Grilled Salmon', 'Fresh salmon fillet grilled to perfection, served with roasted vegetables.', 'https://www.lecremedelacrumb.com/wp-content/uploads/2019/08/cajun-honey-butter-grilled-salmon-2-500x500.jpg', 15.99),
(3, 'Ribeye Steak', 'Juicy ribeye steak cooked to your liking, served with mashed potatoes and gravy.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwcb3mi9or2rlvqbn3NA7NcwIWFhrs_xglOI6ZeH0gsQ&s', 19.99),
(3, 'Pasta Alfredo', 'Fettuccine pasta tossed in creamy Alfredo sauce, garnished with parsley.', 'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Alfredo-dc662e3.jpg?resize=768,574', 14.99),

(4, 'Garlic Bread', 'Toasted bread slices brushed with garlic butter and herbs.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkjfWqcJkKUFhbL9Tih0TmXTdhkilt9MVXxYi4AFG3CA&s', 5.99),
(4, 'Mozzarella Sticks', 'Golden-fried mozzarella sticks served with marinara sauce.', 'https://peaceloveandlowcarb.com/wp-content/uploads/2021/10/Keto-Mozzarella-Sticks-Peace-Love-and-Low-Carb-1.jpg', 7.99),
(4, 'Spinach Artichoke Dip', 'Creamy spinach and artichoke dip served with tortilla chips.', 'https://www.budgetbytes.com/wp-content/uploads/2023/10/Spinach-Artichoke-Dip-party.jpg', 8.99),

(5, 'Chicken Parmesan', 'Breaded chicken breast topped with marinara sauce and melted mozzarella cheese.', 'https://danosseasoning.com/wp-content/uploads/2021/05/Oven-Baked-Chicken-Parm-2-1024x576.jpg', 16.99),
(5, 'Shrimp Scampi', 'Tender shrimp sautéed in garlic butter and white wine sauce, served over pasta.', 'https://www.foodnetwork.com/content/dam/images/food/fullset/2009/1/13/1/vday_shrimpscampi_4493_s4x3.jpg', 18.99),
(5, 'Vegetable Lasagna', 'Layers of pasta, marinara sauce, vegetables, and cheese baked to perfection.', 'https://recipetineats.com/wp-content/uploads/2019/02/Vegetable-Lasagna_10.jpg', 14.99),

(6, 'Cheesecake', 'Creamy cheesecake with a graham cracker crust, topped with your choice of fruit topping.', 'https://sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-4.jpg', 7.99),
(6, 'Chocolate Brownie Sundae', 'Warm chocolate brownie topped with vanilla ice cream, chocolate sauce, and whipped cream.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuMYfjV678szaUQHYwy1AxIQcYvDn7OsN_-JH4hC6Kaw&s', 8.99),
(6, 'Fruit Tart', 'Buttery tart shell filled with pastry cream and topped with fresh fruit.', 'https://confessionsofabakingqueen.com/wp-content/uploads/2022/08/featured-image-1-of-1-1.jpg', 6.99),

(7, 'Shrimp Scampi', 'Tender shrimp sautéed in garlic butter and white wine sauce, served over pasta.', 'https://www.foodnetwork.com/content/dam/images/food/fullset/2009/1/13/1/vday_shrimpscampi_4493_s4x3.jpg', 18.99),
(7, 'Grilled Mahi Mahi', 'Fresh Mahi Mahi fillet grilled to perfection, served with rice and steamed vegetables.', 'https://www.eatingonadime.com/wp-content/uploads/2018/02/grilled-mahi-mahi-6-2.jpg', 17.99),
(7, 'Lobster Tail', 'Juicy lobster tail served with drawn butter and lemon wedges.', 'https://keviniscooking.com/wp-content/uploads/2023/04/Grilled-Lobster-Tail-square.jpg', 29.99),

(8, 'New York Strip Steak', 'Juicy New York strip steak cooked to your liking, served with garlic mashed potatoes.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmngdIQCLfSOLgdjPGj3W1YZg6lwe6CsYeXMtZAQg0ug&s', 21.99),
(8, 'Chicken Alfredo', 'Grilled chicken breast served over fettuccine pasta with creamy Alfredo sauce.', 'https://insanelygoodrecipes.com/wp-content/uploads/2023/01/Creamy-and-Saucy-Chicken-Alfredo-Pasta.jpg', 16.99),
(8, 'Caprese Salad', 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI8_KEuvUkpL_o_MHFHjGEQTQcAPF-g63IUcpbEMStnQ&s', 10.99),

(9, 'Vegetable Curry', 'Assorted vegetables cooked in a flavorful curry sauce, served with basmati rice.', 'https://www.noracooks.com/wp-content/uploads/2022/08/vegan-curry-8.jpg', 13.99),
(9, 'Stuffed Bell Peppers', 'Bell peppers stuffed with a mixture of rice, vegetables, and cheese, baked to perfection.', 'https://www.budgetbytes.com/wp-content/uploads/2023/08/Stuffed-Bell-Peppers-close.jpg', 11.99),
(9, 'Mushroom Risotto', 'Creamy risotto cooked with mushrooms, garlic, and Parmesan cheese.', 'https://www.sweetteaandthyme.com/wp-content/uploads/2023/11/truffle-mushroom-risotto-overhead-close.jpg', 15.99);