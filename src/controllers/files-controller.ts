import { Request, Response } from "express";
import { mkdir, opendir } from "fs/promises";
import { join as pathjoin } from "path";
import { moveFile } from "../files/move";

export const createdir = async (req: Request, res: Response) => {
	const { path, newDir } = req.body;

	mkdir(
		path === "/"
			? pathjoin(
					"/",
					"app",
					`${process.env.STORAGE_URL as string}`,
					req.body.user.id,
					newDir
			  )
			: pathjoin(
					"/",
					"app",
					`${process.env.STORAGE_URL as string}`,
					req.body.user.id,
					...(path as string).split("/"),
					newDir
			  )
	).then(() => {
		return res.json({
			__dirname,
			path: path,
			newDir,
			finalDir:
				path == "/"
					? "/"
					: (path as string).endsWith("/")
					? (path as string).concat(newDir)
					: (path as string).concat("/").concat(newDir),
		});
	});
};

export const uploadfile = async (req: Request, res: Response) => {
	const { path } = req.body;

    console.log(path);
    console.log(req.body);
    console.log(req.files);

	if (!req.files || Object.keys(req.files).length === 0)
		return res.status(400).send("No files were uploaded");

	let files = req.files.file;
	if (!Array.isArray(files)) {
		files = [files];
	}

	if (path === "/") {
		for await (let file of files) {
			moveFile(
				file,
				pathjoin(
					"/",
					"app",
					"app-storage",
					req.body.user.id,
					"/"
				)
			).catch((err) => res.status(400).json({ err }));
		}
	} else {
		for await (let file of files) {
			moveFile(
				file,
				pathjoin(
					"/",
					"app",
					"app-storage",
					req.body.user.id,
					...(path as string).split("/")
				)
			).catch((err) => res.status(400).json({ err }));
		}
	}

	return res.status(200).json({
		message: "Files successfully uploaded",
	});
};

export const listdir = async (req: Request, res: Response) => {
	const { path } = req.body;

	console.log(path);

	let content: {
		files: string[];
		directories: string[];
	} = {
		files: [],
		directories: [],
	};

	const directory = await opendir(
		(path as string) === "/"
			? pathjoin(
					"/",
					"app",
					`${process.env.STORAGE_URL as string}`,
					req.body.user.id
			  )
			: pathjoin(
					"/",
					"app",
					`${process.env.STORAGE_URL as string}`,
					req.body.user.id,
					...(path as string).split("/")
			  )
	);

	for await (const dir of directory) {
		if (dir.isDirectory()) content.directories.push(dir.name);
		else if (dir.isFile()) content.files.push(dir.name);
	}

	return res.status(200).json({ content, path });
};
