import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "gallery.json");

function ensureDataFile() {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataPath)) {
    const defaultGallery = [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070",
        alt: "Classic haircut",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070",
        alt: "Beard trim",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074",
        alt: "Barber shop interior",
        createdAt: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(dataPath, JSON.stringify(defaultGallery, null, 2));
  }
}

function getGalleryImages() {
  ensureDataFile();
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

function saveGalleryImages(images: any[]) {
  ensureDataFile();
  fs.writeFileSync(dataPath, JSON.stringify(images, null, 2));
}

export async function GET() {
  try {
    const images = getGalleryImages();
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const images = getGalleryImages();
    const newImage = {
      id: Date.now().toString(),
      url: body.url,
      alt: body.alt || "Gallery image",
      createdAt: new Date().toISOString(),
    };
    images.push(newImage);
    saveGalleryImages(images);
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }
    
    const images = getGalleryImages();
    const filteredImages = images.filter((img: any) => img.id !== id);
    saveGalleryImages(filteredImages);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
