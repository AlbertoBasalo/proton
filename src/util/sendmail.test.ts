import { sendMail } from './sendmail';

it('WHEN call sendMail THEN sent it', async () => {
  const sut = sendMail;
  // Act
  const actual = await sut('albertobasalo71@gmail.com', 'This is a test email', '<h1>Hello</h1>');
  // Assert
  const expected = 'albertobasalo71@gmail.com';
  expect(actual.accepted[0]).toBe(expected);
});
