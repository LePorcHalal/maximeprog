///////////////////////////////////////////////////////////
//  Cube.h
//  Implementation of the Class Cube
//  Created on:      25-oct.-2018 20:47:57
//  Original author: p482457
///////////////////////////////////////////////////////////

#if !defined(EA_8099F38C_C8A3_47d0_948F_F38A0B83FFB2__INCLUDED_)
#define EA_8099F38C_C8A3_47d0_948F_F38A0B83FFB2__INCLUDED_

#include "PrimitiveAbs.h"

class Cube : public PrimitiveAbs
{

public:
	Cube(const Point3D& pt, float ln, float lg, float ht);
	virtual ~Cube();
	virtual Cube* clone() const;

	virtual size_t getNbParameters() const;
	virtual PrimitiveParams getParameters() const;
	virtual void setParameter(size_t pIndex, float pValue);

private:
	virtual std::ostream& toStream(std::ostream& o) const;

	float m_dimensions[3];
};
#endif // !defined(EA_8099F38C_C8A3_47d0_948F_F38A0B83FFB2__INCLUDED_)
