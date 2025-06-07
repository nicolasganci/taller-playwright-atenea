import { test, expect } from '@playwright/test';

test('TC1 - Verify visual elements on register page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator ('input[name=firstName]')).toBeVisible();
  await expect(page.locator ('input[name=lastName]')).toBeVisible();
  await expect(page.locator ('input[name=email]')).toBeVisible();
  await expect(page.locator ('input[name=password]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
});

test('TC2 - Verify register button is disabled by default', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
})

test('TC3 - Complete register form', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Nicolas');
  await page.locator('input[name=lastName]').fill('Ganci');
  await page.locator('input[name=email]').fill('nicolasganci93@gmail.com');
  await page.locator('input[name=password]').fill('123asd');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
})

test('TC4 - Redirect to login page', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');
})

test('TC5 - Register new user with valid data', async ({page}) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Nicolas');
  await page.locator('input[name=lastName]').fill('Ganci');
  await page.locator('input[name=email]').fill('nicolasgancitest'+Date.now().toString()+'@mail.com');
  await page.locator('input[name=password]').fill('123asd');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro Exitoso')).toBeVisible();
})

test('TC5 - Register user already exist', async ({page}) => {
  const email = 'nicolasgancitest'+Date.now().toString()+'@mail.com';
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Nicolas');
  await page.locator('input[name=lastName]').fill('Ganci');
  await page.locator('input[name=email]').fill(email);
  await page.locator('input[name=password]').fill('123asd');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro Exitoso')).toBeVisible();
  await page.goto('http://localhost:3000/');
  await page.locator('input[name=firstName]').fill('Nicolas');
  await page.locator('input[name=lastName]').fill('Ganci');
  await page.locator('input[name=email]').fill(email);
  await page.locator('input[name=password]').fill('123asd');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
})