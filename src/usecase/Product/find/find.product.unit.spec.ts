import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const product = new Product("123", "Product 1", 20.5);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit Teste find produt use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Product 1",
            price: 20.5
        };

        expect(await useCase.execute(input)).toEqual(output);
    });

    it("should not find a product",async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
            
        });
        const useCase = new FindProductUseCase(productRepository);7
        
        const input = {
            id: "123",
        }

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});