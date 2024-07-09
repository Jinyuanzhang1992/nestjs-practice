import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}

//	1.	User：这是实体类，用于告诉 Repository 这个存储库是针对 User 实体的。
//	2.	dataSource.createEntityManager()：创建一个新的 EntityManager，它是 TypeORM 用来执行数据库操作的对象。通过这个对象，存储库可以执行各种数据库操作（如查询、插入、更新、删除等）。
//这个构造函数将 User 实体和 EntityManager 传递给 Repository 类的构造函数，以便在自定义存储库中使用这些配置。
//继承了 Repository<User>，因此它能够实现简单的 CRUD 操作，无需自己重新实现这些方法。
//	•	find：查找所有实体或符合条件的实体。
//	•	findOne：查找单个符合条件的实体。
//	•	save：保存一个新的或更新的实体。
//	•	delete：删除符合条件的实体。
//	•	其他诸如 update、createQueryBuilder 等等。
