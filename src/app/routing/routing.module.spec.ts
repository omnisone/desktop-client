import { RoutingModule } from './routing.module';

describe('RoutingModuleModule', () => {
  let routingModuleModule: RoutingModule;

  beforeEach(() => {
    routingModuleModule = new RoutingModule();
  });

  it('should create an instance', () => {
    expect(routingModuleModule).toBeTruthy();
  });
});
