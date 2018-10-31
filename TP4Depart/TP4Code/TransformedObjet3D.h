///////////////////////////////////////////////////////////
//  TransformedObjet3D.h
//  Implementation of the Class TransformedObjet3D
//  Created on:      26-oct.-2018 17:42:18
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_DC6E4A6D_4996_480d_BD21_2346CACBC75F__INCLUDED_)
#define EA_DC6E4A6D_4996_480d_BD21_2346CACBC75F__INCLUDED_

#include "PrimitiveAbs.h"

class TransformedObjet3D : public Objet3DAbs
{

public:
	TransformedObjet3D(const PrimitiveAbs& primitiv, const Point3D& translat, float scal);
	TransformedObjet3D(const TransformedObjet3D& mdd);
	virtual ~TransformedObjet3D();
	virtual Objet3DAbs* clone() const;

	virtual void addChild(const Objet3DAbs& obj3d);
	virtual Objet3DIterator begin();
	virtual Objet3DIterator_const cbegin() const;
	virtual Objet3DIterator_const cend() const;
	virtual Objet3DIterator end();
	virtual void removeChild(Objet3DIterator_const obj3dIt);

	virtual Point3D getCenter() const;
	virtual void moveCenter(const Point3D& delta);
	virtual void setCenter(const Point3D& center);

	virtual size_t getNbParameters() const;
	virtual PrimitiveParams getParameters() const;
	virtual void setParameter(size_t pIndex, float pValue);

	virtual float getScale() const;
	virtual void setScale(float scal);
	virtual Point3D getTranslation() const;
	virtual void setTranslation(const Point3D& translat);

protected:
	virtual std::ostream& toStream(std::ostream& o) const;

private:
	float m_scale;
	Point3D m_translation;
	Objet3DPtr m_objet3d;
};
#endif // !defined(EA_DC6E4A6D_4996_480d_BD21_2346CACBC75F__INCLUDED_)
