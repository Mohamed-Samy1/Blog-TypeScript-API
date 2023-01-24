"use strict";
/*
  The base serializer is used here to be able to construct the base
  for building up the serializer and export it in one step
  in both blog serializer and user serializer
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
const BaseSerializer = (dict, fields) => {
    const data = Object();
    fields.forEach((key) => {
        const k = key;
        const v = dict[key];
        data[k] = v;
    });
    return data;
};
const userFields = [
    "_id",
    "name",
    "email",
    "role",
    "createdAt",
    "updatedAt"
];
const blogFields = [
    "_id",
    "title",
    "description",
    "tags",
    "author",
    "createdAt",
    "updatedAt"
];
exports.Serializer = {
    //USER SERIALIZER
    userSerializer: (user) => BaseSerializer(user, userFields),
    usersSerializer: (users) => {
        const data = [];
        users.forEach((user) => {
            data.push(exports.Serializer.userSerializer(user));
        });
        return data;
    },
    //BLOG SERIALIZER
    blogSerializer: (blog) => BaseSerializer(blog, blogFields),
    blogsSerializer: (blogs) => {
        const data = [];
        blogs.forEach((blog) => {
            data.push(exports.Serializer.blogSerializer(blog));
        });
        return data;
    }
};
