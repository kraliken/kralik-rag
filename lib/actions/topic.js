import { connectToDatabase } from "../database/connection/mongoose";
import { Topic } from "../database/models/Topic";

function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function toTopicDto(topic) {
    if (!topic || !topic._id) {
        throw new Error("Invalid topic: missing _id");
    }

    const dto = {
        id: String(topic._id),
    };

    if (hasOwn(topic, "title")) {
        dto.title = topic.title ?? "";
    }

    if (hasOwn(topic, "description")) {
        dto.description = topic.description ?? "";
    }

    if (hasOwn(topic, "createdAt")) {
        const createdAt = topic.createdAt;
        dto.createdAt =
            createdAt instanceof Date ? createdAt.toISOString() : String(createdAt);
    }

    return dto;
}

function toTopicDtos(topics) {
    if (!Array.isArray(topics)) {
        throw new Error("topics must be an array");
    }

    return topics.map(toTopicDto);
}

export async function getAllTopicAction() {
    try {
        await connectToDatabase()
        const topics = await Topic.find({})
            .sort({ createdAt: -1 })
            .select("title description createdAt")
            .lean();

        return {
            ok: true,
            data: toTopicDtos(topics),
        }
    } catch (error) {
        console.error("get topic list action error", error)
        return { ok: false, error: "Server hiba", data: [] }
    }
}