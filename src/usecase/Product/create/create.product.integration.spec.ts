import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductoUseCase from './create.product.usecase';


describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductoUseCase(productRepository);

        const input = {
            type: "a",
            name: "Product 1",
            price: 20.5
        };

        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 20.5,
        };

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });
});