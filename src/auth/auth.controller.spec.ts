import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { mockResponseObject } from 'utils/testUtils';

describe('AuthController', () => {
  let authController: AuthController;

  const req = mockResponseObject();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('/current-user', () => {
    it('should return current logged in user successfully', () => {
      expect(authController.currentUser(req)).toBe({
        msg: 'Get Current User',
      });
    });
  });
});
