import java.awt.PageAttributes.ColorType;

/**
 * Classe PixelMapPlus
 * Image de type noir et blanc, tons de gris ou couleurs
 * Peut lire et ecrire des fichiers PNM
 * Implemente les methodes de ImageOperations
 * @author : 
 * @date   : 
 */

public class PixelMapPlus extends PixelMap implements ImageOperations 
{
	/**
	 * Constructeur creant l'image a partir d'un fichier
	 * @param fileName : Nom du fichier image
	 */
	PixelMapPlus(String fileName)
	{
		super( fileName );
	}
	
	/**
	 * Constructeur copie
	 * @param type : type de l'image a creer (BW/Gray/Color)
	 * @param image : source
	 */
	PixelMapPlus(PixelMap image)
	{
		super(image); 
	}
	
	/**
	 * Constructeur copie (sert a changer de format)
	 * @param type : type de l'image a creer (BW/Gray/Color)
	 * @param image : source
	 */
	PixelMapPlus(ImageType type, PixelMap image)
	{
		super(type, image); 
	}
	
	/**
	 * Constructeur servant a allouer la memoire de l'image
	 * @param type : type d'image (BW/Gray/Color)
	 * @param h : hauteur (height) de l'image 
	 * @param w : largeur (width) de l'image
	 */
	PixelMapPlus(ImageType type, int h, int w)
	{
		super(type, h, w);
	}
	
	/**
	 * Genere le negatif d'une image
	 */
	public void negate()
	{
		// compléter
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				imageData[i][j] = imageData[i][j].Negative();
			}
		}
	}
	
	/**
	 * Convertit l'image vers une image en noir et blanc
	 */
	public void convertToBWImage()
	{
		// compléter
		this.imageType = ImageType.BW;
		PixelMap tmp = this.toBWImage();
		this.imageData = tmp.imageData;	
		tmp.clearData();
	}
	
	/**
	 * Convertit l'image vers un format de tons de gris
	 */
	public void convertToGrayImage()
	{
		// compléter
		this.imageType = ImageType.Gray;
		PixelMap tmp = this.toGrayImage();
		this.imageData = tmp.imageData;	
		tmp.clearData();
	}
	
	/**
	 * Convertit l'image vers une image en couleurs
	 */
	public void convertToColorImage()
	{
		// compléter
		this.imageType = ImageType.Color;
		PixelMap tmp = this.toColorImage();
		this.imageData = tmp.imageData;
		tmp.clearData();
	}
	
	public void convertToTransparentImage()
	{
		// compléter
		this.imageType = ImageType.Transparent;
		PixelMap tmp = this.toTransparentImage();
		this.imageData = tmp.imageData;	
		tmp.clearData();
	}
	
	
	/**
	 * Modifie la longueur et la largeur de l'image 
	 * @param w : nouvelle largeur
	 * @param h : nouvelle hauteur
	 */
	public void resize(int w, int h) throws IllegalArgumentException
	{
		if(w < 0 || h < 0)
			throw new IllegalArgumentException();

		PixelMap image = new PixelMap(this);
		int resizedWidth = width/w;
		int resizedHeight = height/h;
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < w; j++) {
				imageData[i][j] = image.getPixel(resizedHeight*i,resizedWidth*j);
			}
		}
		height=h;
		width=w;

		// compléter
		
	}
	
	/**
	 * Insert pm dans l'image a la position row0 col0
	 */
	public void inset(PixelMap pm, int row0, int col0) throws IllegalArgumentException
	{
		// compléter
		if(row0 < 0 || col0 < 0)
			throw new IllegalArgumentException();
		
		if(this.imageType != pm.getType() ) {
			pm = new PixelMap(this.imageType, pm);
		}
		for(int i = row0; i < (row0 + pm.getHeight()); i++)
		{
			for(int j = col0; j < (col0 + pm.getWidth()); j++)
			{
				imageData[i][j] = pm.imageData[i - row0][j - col0];
			}
		}

		
	}
	
	/**
	 * Decoupe l'image 
	 */
	public void crop(int h, int w) throws IllegalArgumentException
	{
		// compléter		
		if(w <= 0 || h <= 0)
			throw new IllegalArgumentException();
		
		AbstractPixel[][] cropped = new AbstractPixel[h][w];
		for(int i = 0; i < h; i++) {
			for(int j = 0; j < w; j++) {
				if (i - height >= 0 || j - width >= 0) {
					cropped[i][j] = new BWPixel(true);
				}
				else
					cropped[i][j] = imageData[i][j];
			}
		}
		imageData = cropped;
		height = h;
		width = w;

	}
	
	/**
	 * Effectue une translation de l'image 
	 */
	public void translate(int rowOffset, int colOffset)
	{
		// compléter		
		AbstractPixel[][] translated = new AbstractPixel[height][width];
		
		for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
            	if (i - rowOffset < 0  || j - colOffset < 0 || i - rowOffset >= height || j - colOffset >= height) {
					translated[i][j] = new BWPixel(true);
				} else {
					translated[i][j] = imageData[i - rowOffset][j - colOffset];
				}
            }
        }
        imageData = translated;
	
	}
	
	
}
