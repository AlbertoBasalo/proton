import { User } from './User';
import { registerUser } from './users.domain';

describe('register user', async () => {
  let sut;
  beforeEach(() => {
    // Arrange
    sut = registerUser;
  });
  it('should ', async () => {
    // Act
    const input: User = {
      id: '99',
      name: '99',
      email: 'albertobasalo@hotmail.com',
    };
    const actual = await sut(input);
    // Assert
    expect(actual).not.toBeNull();
  });
});
