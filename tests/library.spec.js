const { test, expect } = require('@playwright/test');

//her testen önce çalışması gereken
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/book');
});

//sayfanın erişilebilir olup olmadığı
test('Verify that the web page is accessable', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3001/book');
    await expect(page).toHaveTitle(/Library App/);
});

const BOOK_ITEMS = [{
    title: "test",
    author: "test author",
    page: "10",
    stock: "1",
    img: "test.jpg",
    details:"test details"
}];

test.describe('Library CRUD testing', async() => {
    test('should allow me to add book item', async ({ page }) => {

        await page.getByRole('button', { name: /Add Book/i }).click();
        // create a add book locator and fill form elements 
        await page.getByPlaceholder('Enter book title').fill(BOOK_ITEMS[0].title);
        await page.getByPlaceholder('Enter author name').fill(BOOK_ITEMS[0].author);
        await page.getByPlaceholder('Enter number of pages').fill(BOOK_ITEMS[0].page);
        await page.getByPlaceholder("Enter stock quantity").fill(BOOK_ITEMS[0].stock);
        await page.getByPlaceholder("Enter book details").fill(BOOK_ITEMS[0].details);

        // Start waiting for file chooser before clicking.
        await page.locator('input[name="image"]').click();
        await page.locator('input[name="image"]').setInputFiles('tests\\img\\devlet.jpg');

        // Create 1st book.
        await page.getByRole('button', { name: 'Add Book' }).click();

        //check for book added correctly
        await expect(page.getByTitle('title').last()).toHaveText(BOOK_ITEMS[0].title);
        await expect(page.getByTitle('author').last()).toHaveText(BOOK_ITEMS[0].author)
        await expect(page.getByTitle('page').last()).toHaveText(BOOK_ITEMS[0].page)
        await expect(page.getByTitle('stock').last()).toHaveText(BOOK_ITEMS[0].stock)
    });


    test('Open Details Page', async({page})=>{
        //Click Details button
        await page.getByText('Details').first().click();
        //check back button visible
        await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
        //click add to cart button
        await page.getByRole('button').nth(4).click();
        //click back button
        await page.getByRole('button', { name: 'Back' }).click();
        //check to return book list
        await expect(page.getByText('Book List')).toBeVisible();
        //click card list button
        await page.locator('div').filter({ hasText: /^Sign InSign Up$/ }).getByRole('link').click();
        //check card is added to list
        await expect(page.getByRole('cell', { name: 'test' }).first()).toHaveText('test')
    });

    test('Search from Book list', async({page})=>{
        //localate search and fill 
        await page.getByPlaceholder('Search').fill('np');
        //press enter
        await page.keyboard.press('Enter');
        //list must be empty
        await expect(page.getByTitle('title')).toHaveCount(0);
        await expect(page.getByTitle('author')).toHaveCount(0);
    });

    test('update book', async({page})=>{
        //click update button
        await page.getByRole('button', { name: 'Update' }).first().click();
        //check book form addbok button turn to update button
        await expect(page.getByRole('button', { name: 'Update Book' })).toBeVisible();
        //check book attribute comes true
        await expect(page.getByPlaceholder('title')).toHaveValue('test');
        //change title
        await page.getByPlaceholder('Enter book title').fill('New Test');
        //click update button
        await page.getByRole('button', { name: 'Update Book' }).click();
        //check book list 1st item is changed
        await expect(page.getByPlaceholder('title')).toHaveValue('New Test');
    });

    test('Delete book item', async ({ page }) => {
        //count book list items
        const bookItems=await page.getByTitle('title').count();
        //click remove button
        await page.getByRole('button', { name: 'Remove' }).first().click();
        //check list item is deleted
        await expect(page.getByTitle('title')).toHaveCount(0);
    });
})






