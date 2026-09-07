# SauceDemo Functional Test Plan

## Application Overview

Test plan for the SauceDemo e-commerce demo application covering authentication, product browsing, cart management, checkout, navigation, and UI behavior based on the provided feature specification.

## Test Scenarios

### 1. SauceDemo Functional Coverage

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login and logout flow

**File:** `tests/sauce-demo/authentication.spec.ts`

**Steps:**
  1. Open the SauceDemo login page at https:/www.saucedemo.com/
    - expect: The login form is displayed and ready for input.
  2. Log in with a valid standard user account (standard_user / secret_sauce).
    - expect: The inventory page loads successfully.
    - expect: The product catalog is visible.
    - expect: The cart badge is present or zero based on cart state.
  3. Click the menu/logout control.
    - expect: The user is logged out.
    - expect: The login page is displayed again.
    - expect: The session no longer grants access to protected inventory/cart routes.

#### 1.2. Invalid and locked-out login handling

**File:** `tests/sauce-demo/authentication.spec.ts`

**Steps:**
  1. Attempt login with a valid username but incorrect password.
    - expect: An error message is displayed.
    - expect: The user remains on the login page.
    - expect: No authenticated session is created.
  2. Attempt login with the locked_out_user account.
    - expect: The login is rejected with the appropriate locked-out error.
    - expect: The user is not redirected to the inventory page.
  3. Attempt login with an unknown username.
    - expect: The login fails with an error message.
    - expect: The interface remains in a non-authenticated state.

#### 1.3. Inventory page displays products and supports sorting

**File:** `tests/sauce-demo/catalog.spec.ts`

**Steps:**
  1. Log in as a valid user and open the inventory page.
    - expect: All products are visible in the main inventory grid.
    - expect: Each product includes name, price, and image or product identifier.
  2. Sort products by Name (A-Z).
    - expect: Products are ordered alphabetically from A to Z by name.
  3. Sort products by Name (Z-A).
    - expect: Products are ordered alphabetically from Z to A by name.
  4. Sort products by Price (low to high) and then Price (high to low).
    - expect: Products are ordered by ascending and descending price as expected.

#### 1.4. Product details page shows correct product information

**File:** `tests/sauce-demo/catalog.spec.ts`

**Steps:**
  1. Open a product item from the inventory page.
    - expect: The product details page loads for the selected item.
  2. Verify the page displays the product name, price, description, and image.
    - expect: All required product details match the selected item as shown in the catalog.
  3. Use the back navigation to return to the inventory page.
    - expect: The user returns to the product listing without losing session state.

#### 1.5. Add, remove, and review cart items

**File:** `tests/sauce-demo/cart.spec.ts`

**Steps:**
  1. Add a product to the cart from the inventory page.
    - expect: The cart badge counter increments by 1.
    - expect: The item is present in the cart.
  2. Add a second product from the product details page.
    - expect: The cart badge increments again.
    - expect: The cart contains both items.
  3. Open the cart and review the list and totals.
    - expect: The selected items are displayed with correct names and prices.
    - expect: The totals reflect the current cart contents.
  4. Remove one item from the cart.
    - expect: The removed item is no longer displayed.
    - expect: The cart badge and total update correctly.
  5. Continue shopping.
    - expect: The user returns to the product catalog without losing the remaining cart contents.

#### 1.6. Cart quantity and business rule enforcement

**File:** `tests/sauce-demo/cart.spec.ts`

**Steps:**
  1. Attempt to add the same product to the cart more than once.
    - expect: The system enforces the rule that each product can only have quantity 1 in the cart.
    - expect: The cart does not allow duplicate items beyond the quantity limit.
  2. Verify the cart badge reflects the number of unique products rather than duplicate quantities.
    - expect: The badge count matches the unique product count in the cart.
  3. Review the cart summary and totals for a single-quantity cart state.
    - expect: Totals and badge count remain accurate and consistent with the defined business rule.

#### 1.7. Complete a valid checkout flow

**File:** `tests/sauce-demo/checkout.spec.ts`

**Steps:**
  1. Add at least one product to the cart and proceed to checkout.
    - expect: The checkout information form is displayed.
  2. Enter valid customer details: first name, last name, and postal code.
    - expect: The form accepts the entered values and proceeds to the review step.
  3. Review the order summary.
    - expect: The item list, total, and tax are displayed.
    - expect: The tax amount is computed at 8% of the item subtotal.
  4. Complete the order.
    - expect: The confirmation page is displayed.
    - expect: The user receives an order completion confirmation message.
  5. Navigate back to the products page after checkout.
    - expect: The user is returned to the inventory listing.
    - expect: The app is in a valid post-checkout state.

#### 1.8. Checkout validation and required field handling

**File:** `tests/sauce-demo/checkout.spec.ts`

**Steps:**
  1. Begin checkout with an empty cart or with the cart populated but leave required fields blank.
    - expect: The checkout cannot be completed until all required fields are provided.
  2. Submit the form with one or more required fields missing.
    - expect: Validation errors are displayed.
    - expect: The user remains on the checkout form.
    - expect: No order is created.
  3. Retry with all required fields filled in.
    - expect: The user can proceed successfully to the order review and completion flow.

#### 1.9. Navigation and menu behavior

**File:** `tests/sauce-demo/navigation-ui.spec.ts`

**Steps:**
  1. Log in and open the main menu from the header.
    - expect: The menu expands or reveals navigation options.
  2. Navigate to the cart, all items, and logout options from the menu as applicable.
    - expect: Each menu option opens the expected screen or action.
  3. Observe the cart badge while adding/removing items.
    - expect: The badge updates in real time and remains consistent with the cart contents.

#### 1.10. Protected routes and responsive UI behavior

**File:** `tests/sauce-demo/navigation-ui.spec.ts`

**Steps:**
  1. Attempt to access the inventory page without authenticating.
    - expect: The user is redirected to the login page or denied access.
  2. Attempt to access the cart page without authenticating.
    - expect: The user is redirected to the login page or denied access.
  3. Resize the browser to tablet and mobile viewport widths.
    - expect: The application layout remains usable and content is not hidden or broken.
    - expect: Controls remain visible and accessible.
  4. Trigger an invalid action, such as directly submitting incomplete checkout data or using an invalid route.
    - expect: The application shows an appropriate error state or validation feedback without crashing.
