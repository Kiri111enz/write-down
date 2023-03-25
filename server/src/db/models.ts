import { Model, Table, Column, DataType,
    Unique, AllowNull, Length, NotContains, Is, IsEmail } from 'sequelize-typescript';

const HASH_REGEX = /^\$2[ayb]\$.{56}$/;

@Table
class User extends Model {
    @Unique
    @AllowNull(false)
    @Length({ min: 4, max: 16 })
    @NotContains(' ')
    @Column
    declare name: string;

    @Unique
    @AllowNull(false)
    @IsEmail
    @Column
    declare email: string;

    @AllowNull(false)
    @Is('Hash', (value: string) => {
        if (!HASH_REGEX.test(value))
            throw new Error(`"${value}" passed as password hash.`);
    })
    @Column(DataType.STRING(60))
    declare password: string;
}

export { User };